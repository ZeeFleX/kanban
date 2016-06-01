class CreateOptions < ActiveRecord::Migration
  def change
    create_table :options do |t|
    	t.string :name
    	t.string :description
    	t.integer :optgroup_id
      t.timestamps null: false
    end
  end
end
