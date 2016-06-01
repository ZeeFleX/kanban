class AddColumnsCityAndCountryToProfiles < ActiveRecord::Migration
  def change
  	add_column :profiles, :city_id, :integer
  	add_column :profiles, :country_id, :integer 
  end
end
