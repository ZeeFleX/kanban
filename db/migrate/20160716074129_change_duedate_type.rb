class ChangeDuedateType < ActiveRecord::Migration
   def self.up
    change_table :tasks do |t|
      t.change :due_date, :datetime
    end
  end
  def self.down
    change_table :tasks do |t|
      t.change :due_date, :date
    end
  end
end
