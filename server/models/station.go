package models

type Station struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Kota string `json:"kota" gorm:"type: varchar(255)"`
	Name string `json:"name" gorm:"type: varchar(255)"`
}

type StationResponse struct {
	ID   int    `json:"id" gorm:"primary_key:auto_increment"`
	Kota string `json:"kota" gorm:"type: varchar(255)"`
	Name string `json:"name" gorm:"type: varchar(255)"`
}

func (Station) TableName() string {
	return "station"
}

func (StationResponse) TableName() string {
	return "station"
}
