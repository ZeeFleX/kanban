class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
    	t.string :name, null: false
    	t.string :address
    	t.string :logo
    	t.integer :country_id
    	t.integer :city_id
      t.timestamps null: false
    end
  end
end
