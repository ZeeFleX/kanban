class User < ActiveRecord::Base
	has_one :profile
	has_and_belongs_to_many :projects
	has_many :tasks_reporters, class_name: "Task", foreign_key: "reporter_id"
	has_many :tasks_assignees, class_name: "Task", foreign_key: "assignee_id"
end
