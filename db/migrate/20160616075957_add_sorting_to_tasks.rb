class AddSortingToTasks < ActiveRecord::Migration
  def change
  	add_column :tasks, :sort, :integer
  end
end
