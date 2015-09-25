# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create([{first_name:'Wesley',last_name:'Vance',user_name:'wesley.vance',email:'wesley.vance@tamu.edu',uid:'520007455'}])
Course.create([
	{name:'Computer Human Interaction', number:'436', college:'Dwight Engineering', university:'Texas A&M', building:'Harington Education Center', room:'200', credits:'3', students:'65'},
	{name:'Wireless & Mobile Systems', number:'464', college:'Dwight Engineering', university:'Texas A&M', building:'Blocker', room:'149', credits:'3', students:'75'},
	{name:'Analysis of Algorithms', number:'411', college:'Dwight Engineering', university:'Texas A&M', building:'Bright', room:'113', credits:'3', students:'50'}

])