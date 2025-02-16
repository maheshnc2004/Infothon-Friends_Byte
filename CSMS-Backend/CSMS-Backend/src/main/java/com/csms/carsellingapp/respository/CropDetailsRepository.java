package com.csms.carsellingapp.respository;

import com.csms.carsellingapp.entity.CropDetails;
import com.csms.carsellingapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface CropDetailsRepository extends JpaRepository<CropDetails, Integer> {

    List<CropDetails> findByUser(User user);

    List<CropDetails> findByBrandContaining(String keyword);
}

