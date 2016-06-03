class ProjectsOption < ActiveRecord::Base
	belongs_to :project
	belongs_to :option
end
