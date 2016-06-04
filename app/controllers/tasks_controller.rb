class TasksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:update]

  def index
  end

  def new
  end

  def create
  end

  def show
  end

  def edit
  end

  def update

    task = Task.find( params[:task_id] )
    task.status_id = params[:status_id]

    puts task.status_id
    render json: {success: true} if task.save

  end

  def destroy
  end
end
