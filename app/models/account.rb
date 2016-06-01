class Account < ActiveRecord::Base
	has_and_belongs_to_many :users
	has_many :accounts_options
	has_many :options, through: :accounts_options
end
