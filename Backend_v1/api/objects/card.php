<?php
class Card{
  
    // database connection and table name
    private $conn;
    private $table_name = "cards";
  
    // object properties
    public $id;
    public $value;
    public $category;
  
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	function readAll(){
    // select all query
    $query = "SELECT
                p.id, p.value, p.category
            FROM
                " . $this->table_name . " p

            ORDER BY
                p.id DESC";
  
    // prepare query statement
    $stmt = $this->conn->prepare($query);
  
    // execute query
    $stmt->execute();
  
    return $stmt;
	}

	function create(){
    // query to insert record
    $query = "INSERT INTO
                " . $this->table_name . "
            SET
                value=:value, category=:category";
  
    // prepare query
    $stmt = $this->conn->prepare($query);
  
    // sanitize
    $this->value=htmlspecialchars(strip_tags($this->value));
    $this->category=htmlspecialchars(strip_tags($this->category));

    // bind values
    $stmt->bindParam(":value", $this->value);
    $stmt->bindParam(":category", $this->category);
  
    // execute query
    if($stmt->execute()){
        return true;
    }
  
    return false;
      
}
}
?>