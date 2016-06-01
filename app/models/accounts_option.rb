class AccountsOption < ActiveRecord::Base
	belongs_to :account
	belongs_to :option
end
