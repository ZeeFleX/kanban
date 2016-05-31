class IndexController < ApplicationController
  def index
  	@user = User.all
    respond_to do |format|
      format.html
      format.json { render json: @user }
    end
  end
end
