class CourseSerializer
  include JSONAPI::Serializer

  attributes :name, :street, :city, :state, :zip_code, :phone, :cost
end
