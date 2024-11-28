package com.store.backend.Api;

import com.store.backend.Config.JwtUtils;
import com.store.backend.DTO.JwtResponseDTO;
import com.store.backend.DTO.LoginRequestDTO;
import com.store.backend.DTO.MessageResponseDTO;
import com.store.backend.DTO.SignupRequestDTO;
import com.store.backend.Entity.ERole;
import com.store.backend.Entity.Role;
import com.store.backend.Entity.User;
import com.store.backend.Repository.RoleRepository;
import com.store.backend.Repository.UserRepository;
import com.store.backend.Service.Impl.UserDetailsImpl;
import com.store.backend.Service.UserService;
import com.store.backend.Util.ImageUtil;
import jdk.internal.instrumentation.Logger;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j // ghi log
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired // tu dong them
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;
    //private Logger logger;

    @PostMapping("/signin")

    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
    // Xac thuc ng dung va tao ma token
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        Authentication test = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponseDTO(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getImageUrl(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequestDTO signUpRequest) throws IOException {
        //Kiểm tra xem tên người dùng hoặc email đã tồn tại chưa.
        //Tạo một thực thể User mới, gán vai trò và lưu vào cơ sở dữ liệu.
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            //logger.info("Username already exists: " + signUpRequest.getUsername());
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponseDTO("Tên đăng nhập đã tồn tại"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            //logger.info("Email already in use: " + signUpRequest.getEmail());
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponseDTO("Email đã được sử dụng"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getAddress(),
                signUpRequest.getFullName()
                );
        user.setCreatedDate(LocalDate.now());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        User userSaved = userRepository.save(user);

        // Lưu avatar  bug
//        if (!signUpRequest.getAvatar().isEmpty()) {
//            String imgUrl = ImageUtil.saveImage(signUpRequest.getAvatar(), userSaved.getId(),"resources/images");
//            userSaved.setImageUrl(imgUrl);
//            userRepository.save(user);
//        }

        //logger.info("User registered successfully: " + signUpRequest.getUsername());
        return ResponseEntity.ok(new MessageResponseDTO("Đăng ký thành công"));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody SignupRequestDTO signupRequest, @PathVariable Long id,Authentication authentication){
        //Cập nhật thông tin người dùng.
        try {
            if (authentication != null){
                User result = userService.updateUser(signupRequest, id);
                return ResponseEntity.ok().body(result);
            }
        }catch (Exception e){

        }
        return ResponseEntity.badRequest().body("false");
    }

    @PostMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@ModelAttribute SignupRequestDTO signupRequest, @PathVariable Long id,Authentication authentication){
        //Cập nhật thông tin hồ sơ người dùng.
        try {
            if (authentication != null){
                User result = userService.updateProfile(signupRequest, id);
                return ResponseEntity.ok().body(result);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().body("false");
    }

    @GetMapping("")
    public ResponseEntity<?> getAllUsers(Authentication authentication) {
        try {
            if (authentication != null){
                return ResponseEntity.ok().body(userService.getAllUsers());
            }
        }catch (Exception e){

        }
        return ResponseEntity.badRequest().body("false");
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id, Authentication authentication){
        try {
            if (authentication != null){
                return ResponseEntity.ok().body(userService.getByUserId(id));
            }
        }catch (Exception e){

        }
        return ResponseEntity.badRequest().body("false");
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@Valid @RequestBody SignupRequestDTO signupRequest, Authentication authentication){
        try {
            if (authentication != null){

                return ResponseEntity.ok().body(userService.addUser(signupRequest));
            }
        }catch (Exception e){

        }
        return ResponseEntity.badRequest().body("false");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id, Authentication authentication){
        try {
            if (authentication != null){

                return ResponseEntity.ok().body(userService.deleteUser(id));
            }
        }catch (Exception e){

        }
        return ResponseEntity.badRequest().body("false");
    }

    @GetMapping("/getUser")
    public  ResponseEntity<?> getUser(){
        // Lấy tt ng dùng đã xác thực
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser  = userService.getUserByUserName(userDetails.getUsername()).get();
        return ResponseEntity.ok(currentUser);
    }

}
