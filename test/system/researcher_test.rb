require "application_system_test_case"

class ResearcherTest < ApplicationSystemTestCase

  describe 'viewing incentive' do
    setup do 
      create(:incentive, code: 'COUPON_123')
      create(:incentive, code: 'COUPON_456', redeemed: true)
    end

    it 'should show all incentives' do
      visit '/setup'
      assert_text 'COUPON_123'
      assert_text 'COUPON_456'
      assert_text 'Redeemed'
    end
  end

  describe 'creating incentive' do
    it 'should show created incentive' do
      visit '/setup'
      fill_in 'incentive_code', with: 'NEW_CODE'
      click_on 'Save'
      assert_text 'NEW_CODE'
    end
  end
end