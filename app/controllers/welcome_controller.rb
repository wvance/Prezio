class WelcomeController < ApplicationController
  def index
  	@users = User.all
  	@courses = Course.all
  	# @parse_object = get_query(@@parse_client)
  end
end
