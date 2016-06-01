class CreateAccountsOptions < ActiveRecord::Migration
  def change
    create_table :accounts_options do |t|
    	t.text :val
    	t.integer :account_id
    	t.integer :option_id
      t.timestamps null: false
    end
  end
end
