import { orderStatus } from "@prisma/client"
import { Type } from "class-transformer"
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from "class-validator"


export class CreateOrderDto {

  

    @IsNotEmpty()
    @IsUUID()
    customer_id: string
    
     
    @IsOptional()
    @IsEnum(orderStatus)
    status?: orderStatus
    
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @Min(0)
    total_amount : number
     

    @IsOptional()
    @IsString()
    billing_address? : string
    
    @IsNotEmpty()
    @IsString()
    shipping_method :string
    

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @IsNumber()
    tracking_number?: number

    
    @IsNotEmpty()
    @IsUUID()
    shipping_address_id: string

    @IsNotEmpty()
    @IsUUID()
    payment_method_id: string


}

