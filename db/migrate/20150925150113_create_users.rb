class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :user_type
      t.string :user_name
      t.string :email
      t.date :last_checkin
      t.integer :checkins
      t.string :avatar
      t.string :uid
      t.integer :score

      t.timestamps null: false
    end
    add_index :users, :user_name, unique: true
    add_index :users, :email, unique: true
    add_index :users, :uid, unique: true
  end
end
