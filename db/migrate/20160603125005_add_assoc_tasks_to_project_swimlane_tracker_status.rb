class AddAssocTasksToProjectSwimlaneTrackerStatus < ActiveRecord::Migration
  def change
  	add_column :tasks, :project_id, :integer
  	add_column :tasks, :swimlane_id, :integer  
  	add_column :tasks, :status_id, :integer  
  	add_column :tasks, :tracker_id, :integer  
  end
end
