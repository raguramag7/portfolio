@RestController
@RequestMapping("/api/contact")

@CrossOrigin(origins = {
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
})

public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody ContactDTO dto) {
        try {
            contactService.saveMessage(dto);
            return ResponseEntity.ok(Map.of("message", "Message sent successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/messages")
    public ResponseEntity<?> getMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }
}
