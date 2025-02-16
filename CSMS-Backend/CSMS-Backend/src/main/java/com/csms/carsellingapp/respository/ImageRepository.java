package com.csms.carsellingapp.respository;

import com.csms.carsellingapp.entity.CropDetails;
import com.csms.carsellingapp.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

    public List<Image> findByCropDetails(CropDetails cropDetails);
}
