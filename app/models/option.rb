class Option < ActiveRecord::Base
	belongs_to :optgroup
	has_many :projects_options
	has_many :accounts, through: :projects_options
end
