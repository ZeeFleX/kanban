class CreateOptgroups < ActiveRecord::Migration
  def change
    create_table :optgroups do |t|
    	t.string :name
      t.timestamps null: false
    end
  end
end
