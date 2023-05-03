package stationdto

type CreateStationRequest struct {
	Kota string `json:"kota" form:"kota" gorm:"type: varchar(255)"`
	Name string `json:"name" form:"name" gorm:"type: varchar(255)"`
}

type UpdateStationRequest struct {
	Name string `json:"name" form:"name" validate:"required"`
	Kota string `json:"kota" form:"kota" gorm:"type: varchar(255)"`
}
