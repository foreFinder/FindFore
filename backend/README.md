# Fore Finder API
> Backend application for [ForeFinder](https://forefinder.herokuapp.com/dashboard) a mobile-focused web application that makes linking up with others for a round of golf easier. Coordination can sometimes be a difficult task when filling spots for a tee time, but ForeFinder provides the tools to make that task a hole in one. Add friends to your ForeFinder network to create a private tee time invitation, or send out an invite to the entire ForeFinder community to get your slots filled ASAP!

[![Build Status][travis-image]][travis-url]
- Developed in tandem with a team from the front-end program at [Turing School of Software & Design](https://turing.edu/) (view their repo [here](https://github.com/foreFinder/fore-finder-fe))

# API Endpoints
Base URL https://fore-finder-be.herokuapp.com

Request Parameters:

| HTTP Verb | Path | Use Case | View JSON Example |
| --- | --- | --- | --- |
| GET | /api/v1/courses | returns all courses available for user to select from | [JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#get-all-courses-detail)
| GET | /api/v1/events | returns all available events, including ability to limit to events open to community, use to populate host view | [JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#get-all-events)
| POST | /api/v1/event | creates a new tee-time (event) |[JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#post-host--add-tee-time)
| DELETE | /api/v1/event | destroys an existing tee-time (event) |[JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#delete-single-event)
| GET | /api/v1/event/{event_id} | fetch details for a specific tee time (includes details on invites accepted) |[JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#get-single-event)
| GET  | /api/v1/players | fetch details for all players |[JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#get-all-player-details)
| POST | /api/v1/players | create new player | [JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#post-player)
| GET | /api/v1/players/{player_id}/events | fetch all events for a single player |[JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#get-all-events-for-single-player)
| PATCH | /api/v1/player-event | accept or decline invitation |[JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#get-all-events-for-single-player)
| POST | /api/v1/friendship | add a friendship |[JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#resource-url-8)
| DELETE | /api/v1/friendship | remove a friendship |[JSON](https://github.com/foreFinder/fore-finder-be/blob/main/API_contract.md#delete-remove-friendship)


## Versions
- Ruby 2.5.3
- Rails 5.2.5


## Development setup

1. Fork and Clone the repo
2. Install gem packages: `bundle install`
3. Setup the database: `rails db:{create,migrate}`
4. Seed the database: `rails db:seed`
5. Run test suite with `bundle exec rspec`

<!-- Markdown link & img dfn's -->  
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.com/github/foreFinder
