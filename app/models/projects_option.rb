class ProjectsOption < ActiveRecord::Base
	belongs_to :account
	belongs_to :option
end
