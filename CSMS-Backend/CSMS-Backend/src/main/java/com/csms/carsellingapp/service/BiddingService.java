package com.csms.carsellingapp.service;


import com.csms.carsellingapp.entity.Bidding;
import com.csms.carsellingapp.entity.CropDetails;
import com.csms.carsellingapp.entity.User;
import com.csms.carsellingapp.respository.BiddingRepository;
import com.csms.carsellingapp.respository.CropDetailsRepository;
import com.csms.carsellingapp.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class BiddingService {

    @Autowired
    private BiddingRepository biddingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CropDetailsRepository cropDetailsRepository;

    public List<Bidding> getAllBidding() {
        return biddingRepository.findAll();
    }

    public Bidding getSingleBidding(Integer biddingId) {
        return biddingRepository.findById(biddingId)
                .orElseThrow(() -> new RuntimeException("Bidding not found"));
    }

    public Bidding createBidding(Bidding bidding , Integer cropId , Integer userId) {
        System.out.println("Today's date : " + LocalDate.now());
        System.out.println("date after 15 days : " + LocalDate.now().plusDays(15));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        CropDetails cropDetails = cropDetailsRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop details not found"));
        bidding.setBidDate(LocalDate.now());
        bidding.setLastDate(LocalDate.now().plusDays(15));
        bidding.setUser(user);
        bidding.setCropDetails(cropDetails);
        return biddingRepository.save(bidding);
    }

    public void deleteBidding(Integer biddingId) {
        Bidding bidding = biddingRepository.findById(biddingId)
                .orElseThrow(() -> new RuntimeException("Bidding not found"));
        biddingRepository.delete(bidding);
    }

    public List<Bidding> getAllBiddingsByUser(Integer userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User details not found"));
        return biddingRepository.findByUser(user);
    }

    public List<Bidding> getAllBiddingsByCropDetails(Integer carId){
        CropDetails cropDetails = cropDetailsRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Crop details not found"));
        return biddingRepository.findByCropDetails(cropDetails);
    }

}
