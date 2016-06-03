class CreateTrackers < ActiveRecord::Migration
  def change
    create_table :trackers do |t|
    	t.string :name
    	t.text :description
    	t.integer :project_id
      t.timestamps null: false
    end
  end
end
