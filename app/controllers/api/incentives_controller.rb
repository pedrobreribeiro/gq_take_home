class Api::IncentivesController < ApplicationController

  ERROR_MESSAGE = "No incentives found"

  def index
    @incentives = Incentive.all.order(created_at: :desc)
    
    render json: @incentives.to_json
  end

  def create
    @incentive = Incentive.new(create_params)

    @incentive.save!
    @incentives = Incentive.all
    render json: @incentives.to_json
  end

  def update
    @incentive = Incentive.find(params[:id])

    @incentive.update!(update_params)
    render json: @incentive.to_json
  end

  def redeem
    @valid_incentives = Incentive.where(redeemed: false)

    if @valid_incentives.size > 0 
      @incentive = Incentive.find(
        # get all ids as a array and use sample to retrieve a random entry
        # maybe there's a better approach
        @valid_incentives.pluck(:id).sample
      )

      @incentive.update!(redeemed: true)
      render json: @incentive.to_json
    else
      render json: { message: ERROR_MESSAGE }, status: 422
    end
  end

  private

  def create_params
    params.require(:incentive).permit(:code)
  end

  def update_params
    params.require(:incentive).permit(:code)
  end
end
