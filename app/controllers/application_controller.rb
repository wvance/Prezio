class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_parse_client

	require 'parse-ruby-client'

private
	def set_parse_client
		@@parse_client = Parse.create :application_id => ENV['parse_app_id'], # required
           												:api_key        => ENV['parse_api_key'], # required
           												:quiet 					=> true | false  # optional, defaults to false
	end
	def get_query(parse_client, input)
		query = parse_client.query(input)
		parse_client.get
	end
end
