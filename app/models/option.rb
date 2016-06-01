class Option < ActiveRecord::Base
	belongs_to :optgroup
	has_many :accounts_options
	has_many :accounts, through: :accounts_options
end
