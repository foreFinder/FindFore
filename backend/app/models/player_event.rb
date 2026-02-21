class PlayerEvent < ApplicationRecord
  belongs_to :event
  belongs_to :player

  enum :invite_status, {
    pending: 0,
    accepted: 1,
    declined: 2,
    closed: 3
  }

  def self.close_or_open_invitations(invite)
    event = Event.find(invite[:event_id])
    invitations = all.where(event_id: event)
    if event.calculate_remaining_spots == 0
      close_invitations(invitations)
    elsif event.calculate_remaining_spots > 0
      open_invitations(invitations)
    end
  end

  def self.close_invitations(invitations)
    invitations.each do |invite|
      if invite.invite_status == "pending"
        invite.update(invite_status: "closed")
      end
    end
  end

  def self.open_invitations(invitations)
    invitations.each do |invite|
      if invite.invite_status == "closed"
        invite.update(invite_status: "pending")
      end
    end
  end
end
