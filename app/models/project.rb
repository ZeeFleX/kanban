class Project < ActiveRecord::Base
	has_and_belongs_to_many :users
	has_many :accounts_options
	has_many :options, through: :accounts_options
	belongs_to :country
	belongs_to :city
	has_many :trackers
	has_many :swimlanes
	has_many :statuses
end
