class TasksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:create, :update]

  def index
  end

  def new
  end

  def create
    

    task = Task.new(params[:task]);

    render json: task if task.save

  end

  def show
    task = Task.find(1)

    render json: task
  end

  def edit
  end

  def update

    Task.update(params[:id], params[:task])

  end

  def destroy
  end

end
