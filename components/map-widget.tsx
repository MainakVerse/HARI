"use client"

export default function MapWidget() {
  return (
    <div className="w-full h-96 bg-muted rounded-lg overflow-hidden border">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29451.529384433667!2d88.2698051258432!3d22.674615032799043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8830efd94c899%3A0x4304d214888b1699!2sDankuni%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1755314658820!5m2!1sen!2sin"
        width="100%"
        height="150%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location"
        className="grayscale hover:grayscale-0 transition-all duration-300"
      />
    </div>
  )
}
