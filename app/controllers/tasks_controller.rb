class TasksController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:create, :update]

  def index
  end

  def new
  end

  def create
    
    if
      task = Task.create(params[:task]);
    then
      render text: task.to_json( :include => { :assignee => { :include => :profile } } )
    end

  end

  def show
    task = Task.find(1)

    render json: task
  end

  def edit
  end

  def update

    if 
      task = Task.update(params[:id], params[:task])
    then
      render text: task.to_json( :include => { :assignee => { :include => :profile } } )
    end
    

  end

  def destroy
  end

end
