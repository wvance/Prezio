class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :name
      t.string :number
      t.string :college
      t.string :university
      t.string :building
      t.string :room
      t.integer :credits
      t.integer :students
      t.integer :teacher

      t.timestamps null: false
    end
  end
end
