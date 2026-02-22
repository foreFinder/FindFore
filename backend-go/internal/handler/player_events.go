package handler

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/ericrabun/findfore-go/internal/model"
	"github.com/ericrabun/findfore-go/internal/store"
)

type updatePlayerEventRequest struct {
	PlayerID     int64  `json:"player_id"`
	EventID      int64  `json:"event_id"`
	InviteStatus string `json:"invite_status"`
}

func inviteStatusToInt(status string) int32 {
	switch status {
	case "pending":
		return 0
	case "accepted":
		return 1
	case "declined":
		return 2
	case "closed":
		return 3
	default:
		return -1
	}
}

func inviteStatusToString(status int32) string {
	switch status {
	case 0:
		return "pending"
	case 1:
		return "accepted"
	case 2:
		return "declined"
	case 3:
		return "closed"
	default:
		return "unknown"
	}
}

func (h *Handler) UpdatePlayerEvent(w http.ResponseWriter, r *http.Request) {
	var req updatePlayerEventRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondError(w, http.StatusBadRequest, "bad_request", "Invalid request body")
		return
	}

	statusInt := inviteStatusToInt(req.InviteStatus)
	if statusInt == -1 {
		respondError(w, http.StatusBadRequest, "validation_error", "Invalid invite status")
		return
	}

	pe, err := h.queries.UpdatePlayerEventStatus(r.Context(), store.UpdatePlayerEventStatusParams{
		PlayerID:     sql.NullInt64{Int64: req.PlayerID, Valid: true},
		EventID:      sql.NullInt64{Int64: req.EventID, Valid: true},
		InviteStatus: sql.NullInt32{Int32: statusInt, Valid: true},
	})
	if err != nil {
		respondError(w, http.StatusNotFound, "not_found", "Player event not found")
		return
	}

	// Cascade logic: check if spots are full
	if err := h.closeOrOpenInvitations(r, req.EventID); err != nil {
		respondError(w, http.StatusInternalServerError, "internal_error", "Failed to update invitation statuses")
		return
	}

	resp := model.PlayerEventResponse{
		ID:           pe.ID,
		PlayerID:     pe.PlayerID.Int64,
		EventID:      pe.EventID.Int64,
		InviteStatus: inviteStatusToString(pe.InviteStatus.Int32),
	}

	respondJSON(w, http.StatusOK, resp)
}

func (h *Handler) closeOrOpenInvitations(r *http.Request, eventID int64) error {
	event, err := h.queries.GetEventByID(r.Context(), eventID)
	if err != nil {
		return err
	}

	acceptedCount, err := h.queries.CountAcceptedForEvent(r.Context(), sql.NullInt64{Int64: eventID, Valid: true})
	if err != nil {
		return err
	}

	remaining := event.OpenSpots.Int32 - int32(acceptedCount)

	if remaining <= 0 {
		// Close all pending invitations
		return h.queries.ClosePendingForEvent(r.Context(), sql.NullInt64{Int64: eventID, Valid: true})
	}

	// Reopen all closed invitations
	return h.queries.ReopenClosedForEvent(r.Context(), sql.NullInt64{Int64: eventID, Valid: true})
}
