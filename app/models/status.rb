class Status < ActiveRecord::Base
	belongs_to :project
	has_many :tasks
end
