package com.csms.carsellingapp.service;


import com.csms.carsellingapp.entity.CropDetails;
import com.csms.carsellingapp.entity.User;
import com.csms.carsellingapp.respository.CropDetailsRepository;
import com.csms.carsellingapp.respository.ImageRepository;
import com.csms.carsellingapp.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropDetailsService {

    @Autowired
    private CropDetailsRepository cropDetailsRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ImageRepository imageRepository;

    public CropDetails getSingleCropDetails(Integer cropId) {
        return cropDetailsRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Car not found with the provided details!!"));
    }

    public List<CropDetails> getAllCropDetails() {
        return cropDetailsRepository.findAll();
    }

    public CropDetails createCropDetails(CropDetails cropDetails, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        cropDetails.setUser(user);
        return cropDetailsRepository.save(cropDetails);
    }

    public CropDetails updateCarDetails(CropDetails cropDetails, Integer cropId) {
        CropDetails existingCropDetails = cropDetailsRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop details not found!!"));
        existingCropDetails.setBrand(cropDetails.getBrand());
        existingCropDetails.setModel(cropDetails.getModel());
        existingCropDetails.setFarmer(cropDetails.getFarmer());
        return cropDetailsRepository.save(existingCropDetails);
    }

    public void deleteCropDetails(Integer cropId) {
        CropDetails cropDetails = cropDetailsRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop details not found"));
        cropDetailsRepository.delete(cropDetails);
    }

    public List<CropDetails> getAllCropsByUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return cropDetailsRepository.findByUser(user);
    }

    //search api's

    public List<CropDetails> searchByBrandName(String keyword){
        return cropDetailsRepository.findByBrandContaining(keyword);
    }
}
