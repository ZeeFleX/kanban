class RenameAccountsToProjects < ActiveRecord::Migration
  def change
  	#accounts to projects
  	remove_column :accounts, :address, :string, null: true, default: '', index: false
  	remove_column :accounts, :country_id, :integer, null: true, default: '', index: true
  	remove_column :accounts, :city_id, :integer, null: true, default: '', index: true
  	rename_table :accounts, :projects

  	#accounts_users
  	rename_column :accounts_users, :account_id, :project_id
  	rename_table :accounts_users, :projects_users

  	#accounts_options
  	rename_column :accounts_options, :account_id, :project_id
  	rename_table :accounts_options, :projects_options
  end
end
