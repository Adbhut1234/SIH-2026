# API Documentation

Our application exposes several RESTful API endpoints via Next.js API Routes to allow seamless integration with existing Land Records Management Systems (LRMS) and digital governance platforms.

---

## `POST /api/extract-record`

Uploads a document, processes it through the Gemini AI engine, and returns structured land record data.

### Request Body
Must be `multipart/form-data`.
- `file`: The scanned land record (PDF, JPG, PNG).

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Document processed successfully.",
  "data": {
    "record_id": "uuid-1234",
    "extracted_fields": {
      "landowner_details": "Ram Singh",
      "khasra_number": "45/2",
      "khata_number": "108",
      "plot_area": "2.5 Acres",
      "village": "Rampur",
      "district": "Pune"
    },
    "confidence_score": 92.5,
    "needs_manual_verification": false,
    "document_url": "https://supabase.../file.jpg"
  }
}
```

---

## `GET /api/records`

Retrieves a paginated list of processed land records, with optional filtering for the verification dashboard.

### Query Parameters
- `status` (Optional): Filter by status (`pending_verification`, `verified`, `rejected`).
- `district` (Optional): Filter records by district.
- `page` (Optional): Pagination offset.

### Success Response (200 OK)
```json
{
  "success": true,
  "page": 1,
  "total_records": 1540,
  "records": [
    {
      "id": "uuid-1234",
      "landowner_name": "Ram Singh",
      "district": "Pune",
      "status": "verified",
      "confidence_score": 92.5
    }
  ]
}
```

---

## `PATCH /api/records/:id/verify`

Used by human verifiers to correct low-confidence extractions and approve a record.

### Request Body (JSON)
```json
{
  "corrected_fields": {
    "khasra_number": "45/3"
  },
  "status": "verified"
}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Record verified and updated successfully."
}
```

---

## `GET /api/dashboard/stats`

Fetches aggregated statistics for the interactive dashboard.

### Success Response (200 OK)
```json
{
  "success": true,
  "stats": {
    "total_processed": 5420,
    "pending_verification": 312,
    "average_accuracy": 94.2,
    "district_wise_progress": {
      "Pune": 1200,
      "Mumbai": 950,
      "Nagpur": 800
    }
  }
}
```
