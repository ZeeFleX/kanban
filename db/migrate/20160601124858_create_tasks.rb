class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
    	t.string :title
    	t.text :description
    	t.integer :reporter_id
    	t.integer :assignee_id
    	t.integer :account_id
      t.timestamps null: false
    end
  end
end
