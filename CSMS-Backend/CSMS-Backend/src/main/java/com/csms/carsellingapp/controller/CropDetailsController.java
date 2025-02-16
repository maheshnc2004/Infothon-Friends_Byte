package com.csms.carsellingapp.controller;


import com.csms.carsellingapp.entity.CropDetails;
import com.csms.carsellingapp.service.CropDetailsService;
import com.csms.carsellingapp.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class CropDetailsController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private CropDetailsService cropDetailsService;

    @GetMapping("/crops/{cropId}")
    public ResponseEntity<?> retrieveSingleCropDetails(@PathVariable Integer cropId) {
        return new ResponseEntity<>(cropDetailsService.getSingleCropDetails(cropId), HttpStatus.OK);
    }

    @GetMapping("/crops")
    public ResponseEntity<?> retrieveAllCarDetails() {
        return new ResponseEntity<>(cropDetailsService.getAllCropDetails(), HttpStatus.OK);
    }

    @PostMapping("/users/{userId}/cars")
    public ResponseEntity<?> createNewCropDetails(
            @RequestBody CropDetails cropDetails,
            @PathVariable Integer userId
    ) {
        return new ResponseEntity<>(cropDetailsService.createCropDetails(cropDetails, userId), HttpStatus.CREATED);
    }

    @PutMapping("/crops/{cropId}")
    public ResponseEntity<?> updateTheCropDetails(
            @RequestBody CropDetails cropDetails,
            @PathVariable Integer cropId
    ) {
        return new ResponseEntity<>(cropDetailsService.updateCarDetails(cropDetails, cropId), HttpStatus.OK);
    }

    @DeleteMapping("/crops/{cropId}")
    public ResponseEntity<?> removeTheCarDetails(@PathVariable Integer cropId) {
        cropDetailsService.deleteCropDetails(cropId);
        return new ResponseEntity<>("Crop details removed successfully!!", HttpStatus.OK);
    }

    @GetMapping("/users/{userId}/crops")
    public ResponseEntity<?> retrieveAllCropDetailsByUser(@PathVariable Integer userId) {
        return new ResponseEntity<>(cropDetailsService.getAllCropsByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/crops/search")
    public ResponseEntity<?> retrieveAllCropDetailsByBrandName(
            @RequestParam(value = "keyword", required = false) String keyword
    ) {
        return new ResponseEntity<>(cropDetailsService.searchByBrandName(keyword), HttpStatus.OK);
    }
}