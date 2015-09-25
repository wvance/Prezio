json.array!(@courses) do |course|
  json.extract! course, :id, :name, :number, :college, :university, :building, :room, :credits, :students, :teacher
  json.url course_url(course, format: :json)
end
