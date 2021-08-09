require "application_system_test_case"

class CandidateTest < ApplicationSystemTestCase

  describe 'redeeming the incentive' do
    it 'should give the latest coupon' do
      create(:incentive, code: 'COUPON_123', redeemed: false)
      visit '/redeem'
      click_on 'Redeem'
      assert_text 'COUPON_123'
    end

    it 'should show error when no codes are available' do
      create(:incentive, code: 'COUPON_123', redeemed: true)
      visit '/redeem'
      click_on 'Redeem'
      assert_text 'Something went wrong!'
    end
  end
end