class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_parse_client

	require 'parse-ruby-client'

private
	# EXAMPLE OF PARSE INTERACTION IN RUBY
	# https://github.com/adelevie/parse-ruby-client/blob/master/example.rb
	def set_parse_client
		@@parse_client = Parse.create(
		  application_id: ENV['parse_app_id'],
		  api_key: ENV['parse_rest_key'])
	end
	def get_query(parse_client)
		# DO NOTHING... YET ;) 
	end
	# EXAMPLES OF HOW TO USE PARSE
		# THIS CURRENTLY CREATES A RECORD
		# profile = parse_client.object('Profile')
		# profile['first_name']    = 'John'
		# profile['last_name']     = 'Doe'
		# profile['username']      = 'jdoe'
		# profile['email_address'] = 'jdoe@fubar.com'
		# profile['birthday']      = Parse::Date.new('1980-12-25')
		# profile.save
		# profile.increment 'login_count'

		# QUERIES
		# cls = 'GameScore'
		# (1..100).each do |i|
		#   score = client.object(cls)
		#   score['score'] = i
		#   score.save
		# end

		# GET A RECORD WITH SCORES GREATHER THAN 10 AND LESS THAN 20
		# client.query(cls).greater_eq('score', 10).less_eq('score', 20).get

		# client.query(cls).value_in('score', [10, 20, 30, 40]).get

		# PUSH NOTIFICATIONS TO USERS
		# push = client.push(alert: "I'm sending this push to all my app users!")
		# push.save
end
