json.array!(@users) do |user|
  json.extract! user, :id, :first_name, :last_name, :user_type, :user_name, :email, :last_checkin, :checkins, :avatar, :uid, :score
  json.url user_url(user, format: :json)
end
