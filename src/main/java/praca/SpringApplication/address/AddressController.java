package praca.SpringApplication.address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class AddressController {

    @Autowired
    private AddressService addressService;




    @GetMapping("/admin/admin_addresses/addresses")
    public List<Address> list() {
        return addressService.listAll();
    }

    @GetMapping("/admin/admin_addresses/addresses/{address_ID}")
    public ResponseEntity<Address> get(@PathVariable Long address_ID) {
        try {
            Address address = addressService.get(address_ID);
            return new ResponseEntity<Address>(address, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<Address>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/admin/admin_addresses/addaddress")
    public void add(@RequestBody Address address) {
        addressService.save(address);
    }

    @PutMapping("/admin/admin_addresses/addresses/{address_ID}")
    public ResponseEntity<?> update (@RequestBody Address address, @PathVariable Long address_ID) {

            try {
                Address existAddress = addressService.get(address_ID);
                address.setAddress_ID(address_ID);
                addressService.update(address);

                return new ResponseEntity<>(HttpStatus.OK);
            } catch (NoSuchElementException e) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

    }

    @DeleteMapping("/admin/admin_addresses/address/{address_ID}")
    public void delete(@PathVariable Long address_ID) {
        addressService.delete(address_ID);
    }
}
