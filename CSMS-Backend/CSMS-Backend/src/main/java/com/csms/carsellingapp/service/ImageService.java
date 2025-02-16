package com.csms.carsellingapp.service;


import com.csms.carsellingapp.entity.CropDetails;
import com.csms.carsellingapp.entity.Image;
import com.csms.carsellingapp.respository.CropDetailsRepository;
import com.csms.carsellingapp.respository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CropDetailsRepository cropDetailsRepository;

    public void uploadImage(Integer cropId, MultipartFile[] images) {
        CropDetails cropDetails = cropDetailsRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop details not found"));
        Arrays.stream(images).forEach(image -> {
            try {
                Image imageEntity = new Image();
                imageEntity.setName(image.getName());
                imageEntity.setContentType(image.getContentType());
                imageEntity.setData(image.getBytes());
                imageEntity.setCropDetails(cropDetails);
                imageRepository.save(imageEntity);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public byte[] downloadImage(Integer imageId) throws FileNotFoundException {
        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        return image.getData();
    }

    public List<Image> downloadImagesByCropDetails(Integer cropId) throws FileNotFoundException {
        CropDetails cropDetails = cropDetailsRepository.findById(cropId).orElseThrow(() -> new RuntimeException("Car not found"));
        return imageRepository.findByCropDetails(cropDetails);
    }
}
