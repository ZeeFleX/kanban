class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
    	t.string :firstname
    	t.string :lastname
    	t.string :middlename
    	t.datetime :birthdate
      t.timestamps null: false
    end
  end
end
